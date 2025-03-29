import React from 'react'
import { Button } from '@mantine/core'
import { CiUser } from 'react-icons/ci'
const AuthActionLinks:React.FC<{isAuthenticated:boolean,theme:string,device:string}> = ({isAuthenticated,theme,device}) => {
  return <div className={device == 'computer' ? 'max-[700px]:hidden flex gap-[10px]' : 'flex flex-col gap-[25px]'} >{isAuthenticated ? (
    <>
      <Button
        variant="outline"
        color={device == 'computer' ? (theme == "light" ? "black" : "white") : 'black'}
      >
        تسجيل خروج
      </Button>
      {device == 'computer' && <CiUser size={23} />}
    </>
  ) : (
    <>
      <Button
        variant="outline"
        color={device == 'computer' ? (theme == "light" ? "black" : "white") : 'black'}
      >
        إنشئ حساب
      </Button>
      <Button
        variant="outline"
        color={device == 'computer' ? (theme == "light" ? "black" : "white") : 'black'}
      >
        تسجيل دخول
      </Button>
    </>
)}
    </div>
}

export default AuthActionLinks
