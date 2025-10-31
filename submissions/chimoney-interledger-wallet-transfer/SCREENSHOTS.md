# Application Screenshots

This document provides visual documentation of the Chimoney Interledger Wallet Transfer application.

## Main Interface

### Transfer Form
The main transfer form where users can:
- Enter recipient's Interledger wallet address (payment pointer format)
- Specify transfer amount in USD
- Submit transfer with validation

**Features shown:**
- Clean, modern UI with Tailwind CSS styling
- Input validation hints
- Responsive design
- Clear call-to-action button

---

### Transaction Confirmation Dialog
Before processing a transfer, users see a confirmation dialog showing:
- Recipient wallet address
- Transfer amount
- Confirmation and cancel options

**Features shown:**
- Modal overlay for focus
- Clear transaction details
- Two-step confirmation process
- Loading states during processing

---

### Success Result Dialog
After a successful transfer, users see:
- Success confirmation with green checkmark
- Transaction ID for reference
- Transfer amount confirmation
- Transaction status

**Features shown:**
- Visual success indicator
- Important transaction details
- Close button to dismiss

---

### Error Handling
When transfers fail, users see:
- Error dialog with red X icon
- Clear error message
- Helpful troubleshooting information

**Features shown:**
- Visual error indicator
- User-friendly error messages
- Ability to retry

---

### Transaction History
Below the transfer form, users can view:
- List of past transactions
- Transaction status (success/failed/pending)
- Recipient addresses
- Amounts and timestamps
- Currency information

**Features shown:**
- Chronological transaction list
- Status indicators with color coding
- Hover effects for better UX
- Clean card-based design

---

## Responsive Design

The application is fully responsive and works on:
- Desktop (1920px+)
- Laptop (1024px - 1920px)
- Tablet (768px - 1024px)
- Mobile (320px - 768px)

---

## Color Scheme

The application uses a professional color palette:
- **Primary**: Purple (#7C3AED) - Buttons and highlights
- **Success**: Green (#10B981) - Success states
- **Error**: Red (#EF4444) - Error states
- **Warning**: Yellow (#F59E0B) - Pending states
- **Background**: White/Light Gray - Clean, minimal
- **Text**: Dark Gray - Readable, accessible

---

## Accessibility Features

- High contrast text
- Proper ARIA labels
- Keyboard navigation support
- Screen reader friendly
- Focus indicators

---

## To Generate Screenshots

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open http://localhost:3000 in your browser

3. Take screenshots of:
   - Empty transfer form
   - Filled transfer form
   - Confirmation dialog
   - Success dialog
   - Error dialog
   - Transaction history

4. Save screenshots to a `screenshots/` directory (not tracked in git)

---

**Note**: Actual screenshots should be generated after the application is running. The above descriptions outline what should be captured for complete documentation.
