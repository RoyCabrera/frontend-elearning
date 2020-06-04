const Categorias = ({categoria}) => {
const {name,description} = categoria;

  return (

    <>
    <div className="col-lg-4 col-md-6">
            <div className="single_feature">
              <div className="icon"><span className="flaticon-student"></span></div>
              <div className="desc">
                <h4 className="mt-3 mb-2">{name} </h4>
                <p>
                  {description}
                </p>
              </div>
            </div>
          </div>
    </>

  );
}

export default Categorias;