import Link from 'next/link';

const Cursos = ({ curso }) => {


  const { id,name, description, teacher, category ,statusId,picture} = curso;

  return (
    statusId === 1 ? (<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 p-1" >
    <div className="single_course">
      <div className="course_head">
      <img style={{width:'100%',
    height: "15vw",
    }} src={`http://localhost:4546/${picture}`}  />
      </div>
      <div className="course_content">
       {/*  <span className="price">Gratis</span> */}
        <span className="tag mb-4 d-inline-block">{category.name} </span>
        <h4 className="mb-3">
          <Link href="/cursos/[id]" as={`/cursos/${id}`} >
          <a >{name} </a>
          </Link>

        </h4>
        <p>{description}</p>
        <div className="course_meta d-flex justify-content-lg-between align-items-lg-center flex-lg-row flex-column mt-4">
          <div className="authr_meta">
            <small className="d-inline-block ml-2">
              {
                teacher ? (<div>
                  {teacher.user.name} {teacher.user.last_name}
                </div>) : null
              }

            </small>
          </div>

        </div>
      </div>
    </div>

  </div>) : null

  );
};

export default Cursos;
