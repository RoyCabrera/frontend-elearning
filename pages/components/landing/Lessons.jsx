import Link from 'next/link';
const Lessons = (props) => {


  return (
    <>
      <li className="justify-content-between d-flex">
        <p>{props.lesson.lesson}</p>

        <Link href="/mi_curso/[lesson]/[id] " as={`/mi_curso/${props.indice}/${props.curso}`} >
        <a className="primary-btn text-uppercase" >
          ver
        </a>
        </Link>

      </li>


    </>
  );
};

export default Lessons;
