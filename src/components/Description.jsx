import React from 'react'

const Description = () => {
    return (
        <>
            <div className=' my-5 lg:my-10 text-base md:text-xl lg:text-3xl px-5 md:px-10 lg:px-20 tracking-tight'>
                <p className='font-sans text-fontBrand'><span className='text-brand' >AffordIt</span> is a smart <span className='text-brand'>affordability calculator</span> which helps you take better <span className='text-brand' >financial</span> decisions. Simply enter your <span className='text-brand'>income</span>, <span className='text-brand' >expenses</span>, and the <span className='text-brand'>price</span> of what you want — and <span className='text-brand' >AffordIt</span> tells you whether you can afford it or not. <br /> Can't <span className='text-brand' >afford</span> it yet? No problem. <span className='text-brand'>Track</span> it, <span className='text-brand'>Save</span> for it, and AffordIt will guide you every step of the way until you can.</p>
            </div>
        </>
    )
}

export default Description