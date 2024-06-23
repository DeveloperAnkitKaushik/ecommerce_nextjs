import Image from 'next/image'
import React from 'react'

const loading = () => {
    return (
        <div className='loadingccontainer'>
            <Image height={50} width={50} alt='' src='/load.gif' />
        </div>
    )
}

export default loading;