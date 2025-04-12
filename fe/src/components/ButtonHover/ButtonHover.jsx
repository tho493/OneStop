import "../../assets/css/buttonhover.css"
const ButtonHover = (props) => {
  const { title } = props
  return (
    <button className="button-hover">{title}</button>
  )
}

export default ButtonHover