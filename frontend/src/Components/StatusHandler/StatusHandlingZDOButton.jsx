import { Link } from "react-router-dom"

export const StatusHandlingZDOButton = ({slideOptions}) => {
    return (
        <>
                  <div
                    className="deliver__block"
                    style={{
                      transform: `translateX(${slideOptions * -100}%)`,
                      transition: "0.1s ease transform",
                    }}
                  >
                  </div>
        
                  <Link
                    className="deliver__buttonZDO"
                    to=""
                    style={{
                      transform: `translateX(${slideOptions * -100}%)`,
                      transition: "0.1s ease transform",
                    }}
                    onClick={() => alert("ZDO is not implemented")}
                  >
                    <p className="deliver__buttontext">Create ZDO to delivery</p>
                    <img src="src/image/hand.svg" alt="" className="deliver__img" />
                    <img src="src/image/box.svg" alt="" className="deliver__imgbox" />
                  </Link>
                  </>
    )
}