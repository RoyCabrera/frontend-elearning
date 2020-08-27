const Comentario = ({comm}) => {
  return (
<>
<div className="comment-list">
                      <div className="single-comment justify-content-between d-flex">
                        <div className="user justify-content-between d-flex">
                          <div className="thumb"></div>
                          <div className="desc">
                            <h5>
                              <a href="#">{comm.user.name} {comm.user.last_name}</a>
                            </h5>
                            {/* <p className="date">December 4, 2017 at 3:12 pm </p> */}
                            <p className="comment">
                              {comm.comment}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
</>

   );
}

export default Comentario;