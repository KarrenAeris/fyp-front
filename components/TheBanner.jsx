import Image from 'next/image';
import { AppButton } from './core/AppButton';

export const TheBanner = () => {
  return (
    <div className="flex flex-col gap-10 justify-center items-center w-full h-screen  ">
      <div className="text-center space-y-2 mb-5">
        <h1 className="text-4xl font-extrabold">Calculate or Upload</h1>
        <p className="text-gray-600">Choose method for ...</p>
      </div>
      <div className="flex gap-10">
        <div className="flex-1 flex flex-col justify-between border rounded p-3">
          <Image
            width={300}
            height={300}
            src="/stl-calculator.svg"
            alt="calc"
          />
          <AppButton opacity>
            Calculate
          </AppButton>
        </div>
        <div className="flex-1 flex flex-col justify-between border rounded p-3">
          <Image
            width={300}
            height={300}
            src="/stl-3d-file.jpg"
            alt="calc"
          />
          <AppButton>
            Upload
          </AppButton>
        </div>
      </div>
    </div>
  )
}
