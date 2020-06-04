import Link from 'next/link';
const MiCurso = ({curso}) => {
  const { course } = curso;

  return (
    <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 p-1" >
      <div className="single_course">
        <div className="course_head">
          <img className="img-fluid" src="img/courses/c1.jpg" alt="" />
        </div>
        <div className="course_content">

          <span className="tag mb-4 d-inline-block">{course.category.name} </span>
          <h4 className="mb-3">
            <Link href="/cursos/[id]" as={`/cursos/`} >
            <a >{course.name} </a>
            </Link>

          </h4>
          <p>{course.description}</p>
          <div className="course_meta d-flex justify-content-lg-between align-items-lg-center flex-lg-row flex-column mt-4">
            <div className="authr_meta">
              <small className="d-inline-block ml-2">
                {course.teacher.user.name} {course.teacher.user.last_name}
              </small>
            </div>
            <div className="mt-lg-0 mt-3">


                <button className="btn genric-btn danger-border btn-block">
                  Eliminar de mis cursos
                </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MiCurso;