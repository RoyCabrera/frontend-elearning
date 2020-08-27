import AceEditor from 'react-ace';

const Post = ({ post }) => {
  return (
    <>
     <article className="row blog_item">
                          <div className="col-md-3">
                            <div className="blog_info text-right">
                              <div className="blog_details">

                              </div>
                            </div>
                          </div>

                          <div className="col-md-9">
                          <a href="#">
                                  <h4>{post.user.name} {post.user.last_name} </h4>
                                </a>
                                <p>
                                  {post.description}
                                </p>
                            <div className="blog_post">
                              <AceEditor
                                className="editor"
                                name="codeEditor"
                                placeholder=""
                                mode="java"
                                theme="chrome"
                                name="editor_code"
                                width="700px"
                                fontSize={20}
                                showPrintMargin={true}
                                showGutter={true}
                                highlightActiveLine={true}
                                value={post.code}
                                setOptions={{
                                  enableBasicAutocompletion: false,
                                  enableLiveAutocompletion: false,
                                  enableSnippets: false,
                                  showLineNumbers: true,
                                  tabSize: 2,
                                }}
                              />

                              {/* aqui avn comentarios */}
                            </div>
                          </div>
                        </article>
    </>
  );
};

export default Post;
