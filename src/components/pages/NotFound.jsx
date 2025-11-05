import notFoundImage from '../../images/notFound.jpg'
function NotFound(){
    return(
        <>
        <div className="mx-auto w-75 hv=100">
            <img src={notFoundImage}></img>
        </div>
        </>
    )
}

export default NotFound