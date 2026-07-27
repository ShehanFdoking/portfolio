# Contact Us Page Setup

## Overview
A fully functional Contact Us page has been added to your portfolio with email and WhatsApp contact options.

## Files Created/Modified

### Frontend Files
1. **Contact.js** (`client/src/components/Contact.js`)
   - React component with contact form
   - Displays contact cards (Email, WhatsApp, Response Time)
   - Shows "What I Can Help With" section
   - Form validation and submission

2. **Contact.css** (`client/src/components/Contact.css`)
   - Matches your Blue & Green theme (#133f79 & #24a513)
   - Responsive design for all screen sizes
   - Professional styling with gradient backgrounds
   - Hover effects and smooth transitions

### Backend Files
1. **contact.js** (`routes/contact.js`)
   - Handles contact form submissions
   - Stores contact messages (in-memory for now)
   - Validates form inputs
   - Can be extended with email service later

### Updated Files
1. **App.js** - Added Contact route
2. **Navbar.js** - Added Contact navigation link
3. **server.js** - Registered contact route endpoint

## Contact Information
- **Email**: fernandoshehan313@gmail.com
- **WhatsApp**: +94 776367985

## Features
✅ Contact form with name, email, subject, message
✅ Direct email link (mailto)
✅ WhatsApp integration (wa.me)
✅ Success/error messages
✅ Responsive mobile design
✅ Professional Blue & Green theme
✅ Additional info about services offered

## How to Use

### For Users
1. Navigate to "Contact" from the navbar
2. Fill in the contact form or use direct links:
   - Click "Send Email" to email directly
   - Click "Message on WhatsApp" to chat on WhatsApp
3. Form submission shows success/error message

### For Admin (Future Enhancement)
The backend also supports:
- GET `/api/contact` - View all messages
- GET `/api/contact/unread` - Count unread messages
- PUT `/api/contact/:id/read` - Mark as read
- DELETE `/api/contact/:id` - Delete message

## Email Integration (Optional)
To enable automatic email replies:
1. Install nodemailer: `npm install nodemailer`
2. Update `routes/contact.js` to use the email configuration
3. Add Gmail app password to `.env`:
   ```
   EMAIL_USER=fernandoshehan313@gmail.com
   EMAIL_PASSWORD=your-app-specific-password
   ```

## Styling Details
- Primary Color: #133f79 (Deep Blue)
- Accent Color: #24a513 (Green)
- Background: #F8FAFC (Light Slate)
- Cards have gradient backgrounds matching the theme
- Smooth hover animations and transitions

## Responsive Breakpoints
- Desktop: Full 2-column layout
- Tablet (768px): Single column
- Mobile (480px): Optimized for small screens
