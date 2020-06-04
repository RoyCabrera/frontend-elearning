import Link from 'next/link';
const Lessons = (props) => {


  return (
    <>
      <li className="justify-content-between d-flex">
        <p>{props.lesson.lesson}</p>


        <button className="btn btn-secondary" disabled>
          Ver
        </button>


      </li>


    </>
  );
};

export default Lessons;
