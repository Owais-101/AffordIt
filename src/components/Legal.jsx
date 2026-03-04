import React from 'react'
import Footer from './Footer'

const termsContent = {
    lastUpdated: "March 2026",
    sections: [
        {
            title: "1. Acceptance of Terms",
            content: "By accessing or using AffordIt, you agree to be bound by these Terms and Conditions. If you do not agree, please discontinue use of the platform immediately."
        },
        {
            title: "2. Use of Service",
            content: "AffordIt is a personal finance tool designed to help users make informed spending decisions. The platform is intended for personal, non-commercial use only. You agree not to misuse, reverse-engineer, or exploit the platform in any unauthorized manner."
        },
        {
            title: "3. Financial Disclaimer",
            content: "AffordIt does not provide professional financial advice. All calculations and suggestions are for informational purposes only. We strongly recommend consulting a certified financial advisor before making any major financial decisions."
        },
        {
            title: "4. User Accounts",
            content: "You are responsible for maintaining the confidentiality of your account credentials. Any activity that occurs under your account is your sole responsibility. Please notify us immediately if you suspect unauthorized access."
        },
        {
            title: "5. Data Accuracy",
            content: "The accuracy of results depends entirely on the information you provide. AffordIt is not responsible for any decisions made based on incorrect or incomplete data entered by the user."
        },
        {
            title: "6. Intellectual Property",
            content: "All content, design, and code within AffordIt is the intellectual property of AffordIt and its creators. You may not copy, reproduce, or distribute any part of the platform without prior written consent."
        },
        {
            title: "7. Termination",
            content: "We reserve the right to suspend or terminate your account at any time if you violate these terms or engage in any activity that harms the platform or its users."
        },
        {
            title: "8. Changes to Terms",
            content: "We may update these Terms and Conditions from time to time. Continued use of AffordIt after any changes constitutes your acceptance of the new terms."
        },
    ]
}

const privacyContent = {
    lastUpdated: "March 2026",
    sections: [
        {
            title: "1. Information We Collect",
            content: "We collect information you provide directly, including your name, email address, and financial data such as income, expenses, and savings goals. We also collect usage data such as pages visited and features used."
        },
        {
            title: "2. How We Use Your Information",
            content: "Your information is used solely to provide and improve the AffordIt service. This includes calculating affordability, tracking savings goals, and personalizing your experience. We do not use your data for advertising purposes."
        },
        {
            title: "3. Data Storage & Security",
            content: "Your data is stored securely using Firebase, powered by Google Cloud infrastructure. We implement industry-standard encryption both in transit and at rest to protect your personal and financial information."
        },
        {
            title: "4. Data Sharing",
            content: "We do not sell, trade, or share your personal information with third parties. Your financial data is private and accessible only to you. We may share anonymized, aggregated data for analytical purposes only."
        },
        {
            title: "5. Cookies",
            content: "AffordIt uses cookies to maintain your session and improve your experience. You can disable cookies in your browser settings, though this may affect certain features of the platform."
        },
        {
            title: "6. Your Rights",
            content: "You have the right to access, update, or delete your personal data at any time. You can manage your data from your account settings or contact us directly to request data deletion."
        },
        {
            title: "7. Third Party Services",
            content: "AffordIt uses Firebase for authentication and data storage. By using our platform, you also agree to Google's Privacy Policy as it applies to Firebase services."
        },
        {
            title: "8. Children's Privacy",
            content: "AffordIt is not intended for users under the age of 13. We do not knowingly collect personal information from children. If we become aware of such data being collected, it will be deleted immediately."
        },
        {
            title: "9. Changes to Privacy Policy",
            content: "We may update this Privacy Policy periodically. We will notify you of significant changes via email or a prominent notice on our platform."
        },
        {
            title: "10. Contact Us",
            content: "If you have any questions or concerns regarding this Privacy Policy, please contact us at support@affordit.app"
        },
    ]
}

const Legal = ({ type = 'terms' }) => {
    const content = type === 'terms' ? termsContent : privacyContent
    const title = type === 'terms' ? 'Terms & Conditions' : 'Privacy Policy'

    return (
        <div className='min-h-screen hero-bg'>

            {/* Header */}
            <div className='bg-white border-b border-orange-100'>
                <div className='max-w-3xl mx-auto px-6 py-4'>
                    <div className='w-10 h-10 bg-[#ff832320] rounded-full flex items-center justify-center mb-4'>
                        <span className='text-brand text-lg'>⚖️</span>
                    </div>
                    <h1 className='text-3xl font-bold text-gray-900 font-heading'>{title}</h1>
                    <p className='text-muted-foreground mt-2 text-sm'>Last updated: {content.lastUpdated}</p>
                </div>
            </div>

            {/* Content */}
            <div className='max-w-3xl mx-auto px-6 py-10 space-y-8'>
                {content.sections.map((section, idx) => (
                    <div key={idx} className='bg-white rounded-2xl p-6 border border-orange-100 shadow-sm'>
                        <h2 className='text-base font-semibold text-brand mb-2'>{section.title}</h2>
                        <p className='text-sm text-gray-600 leading-relaxed'>{section.content}</p>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <Footer />
        </div>
    )
}

export default Legal