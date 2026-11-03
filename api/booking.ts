import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

// Simple in-memory debounce cache to prevent rapid duplicate submissions
const recentSubmissions = new Map<string, number>();

interface BookingRequest {
  referenceCode: string;
  name: string;
  phone: string;
  email: string;
  passengers: string | number;
  date: string;
  dayOfWeek?: string;
  serviceType: string;
  bookingHours?: string | number;
  pickupTime: string;
  tripType?: string;
  pickupLocation: string;
  dropoffLocation: string;
  canText?: string;
  estimatedRate?: number;
  depositAmount?: number;
  returnDate?: string;
  returnTime?: string;
  bags?: string | number;
  childSeats?: string;
  flightOrCruiseDetails?: string;
  specialRequests?: string;
  selectedVehicle?: string;
}

function escapeHtml(str: string = ''): string {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed. Use POST.' });
  }

  try {
    const data: BookingRequest = req.body || {};

    // 1. Validation
    const {
      name,
      email,
      phone,
      date,
      pickupTime,
      pickupLocation,
      dropoffLocation,
      serviceType = 'Private Transfer',
      passengers = '1',
      referenceCode = `SES-${Math.floor(1000 + Math.random() * 9000)}`,
      tripType = 'Standard Transfer',
      dayOfWeek = '',
      bookingHours = '2',
      canText = 'Yes',
      estimatedRate = 0,
      depositAmount = 0,
      returnDate = 'N/A',
      returnTime = 'N/A',
      bags = 'Standard luggage',
      childSeats = 'None requested',
      flightOrCruiseDetails = 'None provided',
      specialRequests = 'None',
      selectedVehicle = serviceType,
    } = data;

    if (!name?.trim() || !email?.trim() || !phone?.trim() || !pickupLocation?.trim() || !dropoffLocation?.trim() || !date?.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Missing required booking details. Please verify your contact and trip information.',
      });
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email address provided.',
      });
    }

    // 2. Prevent duplicate submissions within 30 seconds
    const submissionKey = `${email.toLowerCase()}_${date}_${pickupLocation}`.slice(0, 80);
    const now = Date.now();
    const lastSubmitted = recentSubmissions.get(submissionKey);
    if (lastSubmitted && now - lastSubmitted < 30000) {
      return res.status(429).json({
        success: false,
        error: 'A duplicate booking request was recently received. Please allow a moment before resubmitting or call +1 (206) 504-6000.',
      });
    }
    recentSubmissions.set(submissionKey, now);

    // Clean up cache periodically
    if (recentSubmissions.size > 200) {
      for (const [key, timestamp] of recentSubmissions.entries()) {
        if (now - timestamp > 60000) {
          recentSubmissions.delete(key);
        }
      }
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const businessEmail = process.env.BUSINESS_NOTIFICATION_EMAIL || 'info@seattleexpressshuttle.com';
    // By default on Resend free tier or testing, onboarding@resend.dev can send to verified email.
    // Once seattleexpressshuttle.com is verified, set BOOKING_SENDER_EMAIL="Seattle Express Shuttle <info@seattleexpressshuttle.com>"
    const senderEmail = process.env.BOOKING_SENDER_EMAIL || 'Seattle Express Shuttle <onboarding@resend.dev>';

    // If API key is not yet provided, safely log in development mode
    if (!resendApiKey) {
      console.warn(
        `[Booking API Warning] RESEND_API_KEY is not defined. Simulated booking received for Ref: ${referenceCode}. Configure RESEND_API_KEY in Vercel environment variables.`
      );
      return res.status(200).json({
        success: true,
        referenceCode,
        mode: 'preview_simulated',
        message: 'Booking request logged successfully. Set RESEND_API_KEY in Vercel to dispatch live customer & business emails.',
      });
    }

    const resend = new Resend(resendApiKey);

    // 3. Email Templates Construction

    // --- HTML Template for Business Notification ---
    const businessHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 650px; margin: 0 auto; background-color: #FBF9F5; border: 1px solid #E5DFD5; border-radius: 8px; overflow: hidden; color: #2D3748;">
        <!-- Header -->
        <div style="background-color: #1A2328; padding: 24px 30px; border-bottom: 3px solid #A88B61;">
          <h1 style="margin: 0; color: #FFFFFF; font-size: 20px; font-weight: 700; letter-spacing: 0.5px;">SEATTLE EXPRESS SHUTTLE</h1>
          <p style="margin: 4px 0 0 0; color: #A88B61; font-size: 13px; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 600;">New Customer Booking Request</p>
        </div>

        <!-- Banner -->
        <div style="background-color: #FEE2E2; border-left: 4px solid #DC2626; padding: 14px 24px; margin: 20px 24px 0 24px; border-radius: 4px;">
          <strong style="color: #991B1B; font-size: 14px;">ACTION REQUIRED:</strong>
          <span style="color: #7F1D1D; font-size: 14px;"> Review details, assign vehicle/driver, and contact customer to confirm reservation.</span>
        </div>

        <!-- Key Information Grid -->
        <div style="padding: 24px;">
          <div style="background-color: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 6px; padding: 20px; margin-bottom: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #718096; font-size: 13px; font-weight: 600; text-transform: uppercase; width: 40%;">Booking Reference:</td>
                <td style="padding: 8px 0; color: #DC2626; font-size: 16px; font-weight: 800; letter-spacing: 1px;">${escapeHtml(referenceCode)}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #718096; font-size: 13px; font-weight: 600; text-transform: uppercase;">Customer Name:</td>
                <td style="padding: 8px 0; color: #1A202C; font-size: 15px; font-weight: 700;">${escapeHtml(name)}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #718096; font-size: 13px; font-weight: 600; text-transform: uppercase;">Phone Number:</td>
                <td style="padding: 8px 0; color: #1A202C; font-size: 15px; font-weight: 600;">
                  <a href="tel:${escapeHtml(phone)}" style="color: #2563EB; text-decoration: none;">${escapeHtml(phone)}</a>
                  ${canText === 'Yes' ? '<span style="background-color: #DCFCE7; color: #166534; font-size: 11px; padding: 2px 6px; border-radius: 3px; margin-left: 8px; font-weight: 600;">SMS OK</span>' : ''}
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #718096; font-size: 13px; font-weight: 600; text-transform: uppercase;">Customer Email:</td>
                <td style="padding: 8px 0; color: #1A202C; font-size: 14px;">
                  <a href="mailto:${escapeHtml(email)}" style="color: #2563EB; text-decoration: none;">${escapeHtml(email)}</a>
                </td>
              </tr>
            </table>
          </div>

          <!-- Trip Specifications -->
          <h3 style="color: #1A2328; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 10px 0; font-weight: 700;">Trip &amp; Vehicle Details</h3>
          <div style="background-color: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 6px; padding: 20px; margin-bottom: 20px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 6px 0; color: #718096; font-size: 13px; width: 40%;">Service Requested:</td>
                <td style="padding: 6px 0; color: #1A202C; font-size: 14px; font-weight: 600;">${escapeHtml(serviceType)}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #718096; font-size: 13px;">Trip Type:</td>
                <td style="padding: 6px 0; color: #1A202C; font-size: 14px;">${escapeHtml(tripType)}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #718096; font-size: 13px;">Selected Fleet / Vehicle:</td>
                <td style="padding: 6px 0; color: #1A202C; font-size: 14px; font-weight: 600;">${escapeHtml(selectedVehicle)}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #718096; font-size: 13px;">Pickup Date &amp; Time:</td>
                <td style="padding: 6px 0; color: #1A202C; font-size: 14px; font-weight: 600;">${escapeHtml(date)} ${dayOfWeek ? `(${escapeHtml(dayOfWeek)})` : ''} at ${escapeHtml(pickupTime)}</td>
              </tr>
              ${returnDate && returnDate !== 'N/A' ? `
              <tr>
                <td style="padding: 6px 0; color: #718096; font-size: 13px;">Return Schedule:</td>
                <td style="padding: 6px 0; color: #1A202C; font-size: 14px;">${escapeHtml(returnDate)} at ${escapeHtml(returnTime)}</td>
              </tr>
              ` : ''}
              <tr>
                <td style="padding: 6px 0; color: #718096; font-size: 13px;">Pickup Location:</td>
                <td style="padding: 6px 0; color: #1A202C; font-size: 14px; font-weight: 600;">${escapeHtml(pickupLocation)}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #718096; font-size: 13px;">Drop-off Location:</td>
                <td style="padding: 6px 0; color: #1A202C; font-size: 14px; font-weight: 600;">${escapeHtml(dropoffLocation)}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #718096; font-size: 13px;">Passengers &amp; Bags:</td>
                <td style="padding: 6px 0; color: #1A202C; font-size: 14px;">${escapeHtml(String(passengers))} passengers · ${escapeHtml(String(bags))}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #718096; font-size: 13px;">Booking Hours:</td>
                <td style="padding: 6px 0; color: #1A202C; font-size: 14px;">${escapeHtml(String(bookingHours))} hours</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #718096; font-size: 13px;">Child Seats / Booster:</td>
                <td style="padding: 6px 0; color: #1A202C; font-size: 14px;">${escapeHtml(childSeats)}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #718096; font-size: 13px;">Flight / Cruise Details:</td>
                <td style="padding: 6px 0; color: #1A202C; font-size: 14px;">${escapeHtml(flightOrCruiseDetails)}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #718096; font-size: 13px;">Special Requests:</td>
                <td style="padding: 6px 0; color: #1A202C; font-size: 14px;">${escapeHtml(specialRequests)}</td>
              </tr>
            </table>
          </div>

          <!-- Quote & Rate Breakdown -->
          <div style="background-color: #FAF5EE; border: 1px solid #EAE0D0; border-radius: 6px; padding: 18px 20px; margin-bottom: 24px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="color: #78350F; font-size: 14px; font-weight: 600;">Online Quoted Estimate:</td>
                <td style="color: #78350F; font-size: 18px; font-weight: 800; text-align: right;">$${Number(estimatedRate).toFixed(2)}</td>
              </tr>
              <tr>
                <td style="color: #92400E; font-size: 12px;">Standard Deposit (25%):</td>
                <td style="color: #92400E; font-size: 13px; font-weight: 600; text-align: right;">$${Number(depositAmount).toFixed(2)}</td>
              </tr>
            </table>
          </div>

          <!-- Quick Action Buttons -->
          <div style="text-align: center; padding-top: 10px;">
            <a href="tel:${escapeHtml(phone)}" style="display: inline-block; background-color: #DC2626; color: #FFFFFF; text-decoration: none; font-size: 13px; font-weight: 700; padding: 10px 20px; border-radius: 4px; margin-right: 8px;">CALL CUSTOMER</a>
            <a href="sms:${escapeHtml(phone)}" style="display: inline-block; background-color: #1A2328; color: #FFFFFF; text-decoration: none; font-size: 13px; font-weight: 700; padding: 10px 20px; border-radius: 4px; margin-right: 8px;">SEND SMS</a>
            <a href="mailto:${escapeHtml(email)}" style="display: inline-block; background-color: #4B5563; color: #FFFFFF; text-decoration: none; font-size: 13px; font-weight: 700; padding: 10px 20px; border-radius: 4px;">REPLY EMAIL</a>
          </div>
        </div>

        <!-- Footer -->
        <div style="background-color: #EDF2F7; padding: 14px 24px; text-align: center; font-size: 12px; color: #718096; border-top: 1px solid #E2E8F0;">
          Seattle Express Shuttle Automated Dispatch System · 3507 S 188th St, SeaTac, WA 98188 · +1 (206) 504-6000
        </div>
      </div>
    `;

    // --- HTML Template for Customer Confirmation ---
    const customerHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 650px; margin: 0 auto; background-color: #FAF8F5; border: 1px solid #E5DFD5; border-radius: 8px; overflow: hidden; color: #2D3748;">
        <!-- Header -->
        <div style="background-color: #1A2328; padding: 26px 30px; border-bottom: 3px solid #A88B61; text-align: center;">
          <h1 style="margin: 0; color: #FFFFFF; font-size: 22px; font-weight: 700; letter-spacing: 0.5px;">SEATTLE EXPRESS SHUTTLE</h1>
          <p style="margin: 6px 0 0 0; color: #A88B61; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">Sea-Tac Airport · Cruise Terminals · Executive Chauffeur</p>
        </div>

        <div style="padding: 28px 24px;">
          <!-- Warm Greeting -->
          <h2 style="color: #1A2328; font-size: 18px; margin: 0 0 12px 0;">Hello ${escapeHtml(name)},</h2>
          <p style="color: #4A5568; font-size: 14px; line-height: 1.6; margin: 0 0 20px 0;">
            Thank you for choosing <strong>Seattle Express Shuttle</strong>. We have received your booking request for your upcoming trip. Our dispatch team is reviewing your route and vehicle availability.
          </p>

          <!-- Important Pending Approval Banner (Explicitly required) -->
          <div style="background-color: #FFFBEB; border-left: 4px solid #F59E0B; padding: 14px 18px; border-radius: 4px; margin-bottom: 24px;">
            <strong style="color: #B45309; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 4px;">
              ⏳ Reservation Status: Pending Approval
            </strong>
            <p style="margin: 0; color: #92400E; font-size: 13px; line-height: 1.5;">
              Please note that your reservation is <strong>pending confirmation</strong> and is not yet finalized. A Seattle Express Shuttle reservation specialist will contact you via text, phone, or email to verify flight/cruise staging details and approve your booking.
            </p>
          </div>

          <!-- Trip Summary Box -->
          <div style="background-color: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 6px; padding: 20px; margin-bottom: 22px; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
            <div style="border-bottom: 1px solid #EDF2F7; padding-bottom: 12px; margin-bottom: 14px; display: flex; justify-content: space-between; align-items: center;">
              <span style="color: #718096; font-size: 12px; text-transform: uppercase; font-weight: 600; letter-spacing: 1px;">Booking Reference</span>
              <strong style="color: #DC2626; font-size: 15px; font-family: monospace;">${escapeHtml(referenceCode)}</strong>
            </div>

            <table style="width: 100%; border-collapse: collapse; font-size: 13.5px;">
              <tr>
                <td style="padding: 6px 0; color: #718096; width: 38%;">Service Type:</td>
                <td style="padding: 6px 0; color: #1A202C; font-weight: 600;">${escapeHtml(serviceType)}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #718096;">Trip Type:</td>
                <td style="padding: 6px 0; color: #1A202C;">${escapeHtml(tripType)}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #718096;">Date &amp; Time:</td>
                <td style="padding: 6px 0; color: #1A202C; font-weight: 600;">${escapeHtml(date)} ${dayOfWeek ? `(${escapeHtml(dayOfWeek)})` : ''} at ${escapeHtml(pickupTime)}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #718096;">Pickup Location:</td>
                <td style="padding: 6px 0; color: #1A202C; font-weight: 600;">${escapeHtml(pickupLocation)}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #718096;">Drop-off Location:</td>
                <td style="padding: 6px 0; color: #1A202C; font-weight: 600;">${escapeHtml(dropoffLocation)}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #718096;">Passengers:</td>
                <td style="padding: 6px 0; color: #1A202C;">${escapeHtml(String(passengers))}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #718096;">Estimated Quote:</td>
                <td style="padding: 6px 0; color: #1A202C; font-weight: 700;">$${Number(estimatedRate).toFixed(2)}</td>
              </tr>
            </table>
          </div>

          <!-- Contact & Support Box -->
          <div style="background-color: #F1F5F9; border-radius: 6px; padding: 18px 20px; margin-bottom: 24px;">
            <h4 style="margin: 0 0 8px 0; color: #1E293B; font-size: 14px; font-weight: 700;">Need Immediate Assistance or Have Questions?</h4>
            <p style="margin: 0 0 10px 0; color: #475569; font-size: 13px; line-height: 1.5;">
              If you have urgent travel changes, incoming flight updates, or need an immediate reservation confirmation, please reach our 24/7 dispatch desk directly:
            </p>
            <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
              <tr>
                <td style="padding: 4px 0; color: #64748B; width: 30%;">Call or Text:</td>
                <td style="padding: 4px 0;"><a href="tel:+12065046000" style="color: #DC2626; font-weight: 700; text-decoration: none;">+1 (206) 504-6000</a></td>
              </tr>
              <tr>
                <td style="padding: 4px 0; color: #64748B;">Email:</td>
                <td style="padding: 4px 0;"><a href="mailto:info@seattleexpressshuttle.com" style="color: #2563EB; text-decoration: none;">info@seattleexpressshuttle.com</a></td>
              </tr>
              <tr>
                <td style="padding: 4px 0; color: #64748B;">Headquarters:</td>
                <td style="padding: 4px 0; color: #334155;">3507 S 188th St, SeaTac, WA 98188 (Near Sea-Tac Airport)</td>
              </tr>
            </table>
          </div>

          <p style="color: #64748B; font-size: 13px; line-height: 1.5; margin: 0;">
            Thank you again for traveling with Seattle Express Shuttle. We look forward to welcoming you aboard!
          </p>
        </div>

        <!-- Footer -->
        <div style="background-color: #1A2328; padding: 18px 24px; text-align: center; font-size: 12px; color: #94A3B8; border-top: 1px solid #334155;">
          <p style="margin: 0 0 4px 0; color: #FFFFFF; font-weight: 600;">Seattle Express Shuttle</p>
          <p style="margin: 0; font-size: 11px;">Serving Sea-Tac International Airport, Bell St Pier 66, Smith Cove Pier 91 &amp; Greater Puget Sound</p>
        </div>
      </div>
    `;

    // 4. Send Emails via Resend
    // A) Send to Business Dispatch
    const businessSendPromise = resend.emails.send({
      from: senderEmail,
      to: businessEmail,
      subject: `🚨 New Booking Request: ${referenceCode} – ${name} (${serviceType})`,
      html: businessHtml,
      replyTo: email,
    });

    // B) Send to Customer
    const customerSendPromise = resend.emails.send({
      from: senderEmail,
      to: email,
      subject: 'Your Booking Request Has Been Received – Seattle Express Shuttle',
      html: customerHtml,
      replyTo: businessEmail,
    });

    // Send both in parallel
    const [businessResult, customerResult] = await Promise.allSettled([
      businessSendPromise,
      customerSendPromise,
    ]);

    let businessSuccess = businessResult.status === 'fulfilled' && !('error' in businessResult.value && businessResult.value.error);
    let customerSuccess = customerResult.status === 'fulfilled' && !('error' in customerResult.value && customerResult.value.error);

    // If both failed due to an error, inspect safe error message
    if (!businessSuccess && !customerSuccess) {
      const errA = businessResult.status === 'rejected' ? businessResult.reason : (businessResult.value as any)?.error;
      const errB = customerResult.status === 'rejected' ? customerResult.reason : (customerResult.value as any)?.error;
      const errMsg = String(errA?.message || errB?.message || '');
      console.error('[Booking API] Resend dispatch note:', errMsg);

      // If domain verification on Resend is still pending, Resend restricts to account owner
      const isDomainRestriction = errMsg.includes('verify a domain') || errMsg.includes('not verified');
      if (isDomainRestriction) {
        try {
          // Send to verified account owner so the business never loses the booking lead
          const fallbackRes = await resend.emails.send({
            from: 'Seattle Express Shuttle <onboarding@resend.dev>',
            to: 'khalidmiraj413@gmail.com',
            subject: `🚨 [LEAD CAPTURED] ${referenceCode} – ${name} (${serviceType})`,
            html: businessHtml,
          });
          if (fallbackRes?.data?.id) {
            businessSuccess = true;
          }
        } catch (fbErr: any) {
          console.error('[Booking API] Fallback notification notice:', fbErr?.message);
        }

        return res.status(200).json({
          success: true,
          referenceCode,
          notice: 'Booking received and routed to dispatch. To email customers directly, please verify seattleexpressshuttle.com on Resend.',
          notifications: {
            businessDispatched: businessSuccess,
            customerDispatched: false,
          },
        });
      }

      return res.status(502).json({
        success: false,
        error:
          'Unable to deliver email notification at this moment. Please call our 24/7 dispatch desk directly at +1 (206) 504-6000 with your reference code.',
        referenceCode,
      });
    }

    return res.status(200).json({
      success: true,
      referenceCode,
      notifications: {
        businessDispatched: businessSuccess,
        customerDispatched: customerSuccess,
      },
      message: 'Booking request received and notifications dispatched successfully.',
    });
  } catch (error: any) {
    // Log error safely without exposing customer PII
    console.error('[Booking API Unexpected Error]:', error?.message || 'Unknown error');
    return res.status(500).json({
      success: false,
      error: 'An internal error occurred while processing your booking request. Please call +1 (206) 504-6000.',
    });
  }
}

