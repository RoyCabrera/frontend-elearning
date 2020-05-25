const Cursos = ({ curso }) => {
  console.log(curso);

  const {name,description,teacher} = curso;

  return (
    <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
      <div className="card-deck">
        <div className="card">
          <img src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png" className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{name} </h5>
            <p className="card-text">
              {description}
            </p>
          </div>
          <div className="card-footer">
            <small className="text-muted">{teacher.user.name} {teacher.user.last_name} </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cursos;
