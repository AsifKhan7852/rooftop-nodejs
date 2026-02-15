const Terms = () => {
  const sections = [
    {
      title: '1. Acceptance of Terms',
      content: `By accessing and using RoofTop Cricket's platform, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.`,
    },
    {
      title: '2. User Registration',
      content: `To access certain features of our platform, you must register for an account. You agree to provide accurate, current, and complete information during registration and to update such information to keep it accurate, current, and complete. You are responsible for safeguarding your password and for all activities that occur under your account.`,
    },
    {
      title: '3. Booking and Payments',
      content: `All bookings made through our platform are subject to availability. Prices displayed are in Pakistani Rupees (PKR) and are subject to change without notice. Payment must be made at the time of booking through our secure payment gateway. We accept various payment methods including credit/debit cards and mobile wallets.`,
    },
    {
      title: '4. Cancellation and Refund Policy',
      content: `Cancellations made 24 hours or more before the scheduled booking time are eligible for a full refund. Cancellations made within 24 hours of the scheduled time may be subject to cancellation fees. No-shows will not be refunded. Refunds will be processed within 5-7 business days.`,
    },
    {
      title: '5. Venue Responsibilities',
      content: `Venue owners are responsible for maintaining accurate listings, providing safe and clean facilities, honoring all confirmed bookings, and complying with all local laws and regulations. RoofTop Cricket is not responsible for any disputes between users and venue owners.`,
    },
    {
      title: '6. User Conduct',
      content: `Users agree to use the platform responsibly and not to engage in any activity that could harm other users, venue owners, or the platform itself. Prohibited activities include but are not limited to: providing false information, engaging in fraudulent behavior, violating any laws, or harassing other users.`,
    },
    {
      title: '7. Intellectual Property',
      content: `All content on this platform, including but not limited to text, graphics, logos, images, and software, is the property of RoofTop Cricket or its content suppliers and is protected by intellectual property laws. Unauthorized use of any content is strictly prohibited.`,
    },
    {
      title: '8. Limitation of Liability',
      content: `RoofTop Cricket shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the platform. Our total liability shall not exceed the amount paid by you for the specific booking in question.`,
    },
    {
      title: '9. Privacy Policy',
      content: `Your privacy is important to us. Our Privacy Policy, which is incorporated into these Terms by reference, describes how we collect, use, and protect your personal information. By using our platform, you consent to the collection and use of your information as described in our Privacy Policy.`,
    },
    {
      title: '10. Changes to Terms',
      content: `We reserve the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting on the platform. Your continued use of the platform after any changes constitutes acceptance of the new terms.`,
    },
    {
      title: '11. Contact Information',
      content: `If you have any questions about these Terms and Conditions, please contact us at support@rooftopcricket.pk or through our Contact Us page.`,
    },
  ]

  return (
    <div className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-100 mb-4">
            Terms & <span className="gradient-text">Conditions</span>
          </h1>
          <p className="text-gray-400">
            Last updated: February 2024
          </p>
        </div>

        {/* Content */}
        <div className="card p-8 space-y-8">
          <p className="text-gray-400">
            Welcome to RoofTop Cricket. These terms and conditions outline the rules and regulations for the use of our platform.
          </p>

          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-xl font-display font-semibold text-gray-100 mb-3">
                {section.title}
              </h2>
              <p className="text-gray-400 leading-relaxed">{section.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Terms
