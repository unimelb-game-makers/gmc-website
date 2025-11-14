import Link from 'next/link'
import Image from 'next/image'
 
export default function NotFound() {
  return (
    <div className='flex justify-center'>
        <div>
            <div className="flex justify-center">
                <Image src="/images/wires.png" width={400} height={400} alt="wires"/>
            </div>
            <h1 className='text-center font-bold text-5xl m-5'>404 Page Not Found</h1>
            <h1 className='text-center font-semibold text-2xl'>Oops! The page you are looking for cannot be found. It may be an outdated or incorrect link</h1>
            <div className="flex justify-center">
                <Link className='text-center font-semibold text-2xl text-cyan-400' href="/">Return Home</Link>
            </div>
        </div>
    </div>
  )
}
