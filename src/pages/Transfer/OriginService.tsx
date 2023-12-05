import ServicesCards from "../../components/molecules/ServicesCards";

const OriginService = () => {
  return (
    <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
      <div style={{marginTop: '4rem'}}></div>
      <ServicesCards isSelectingOriginService={true}/>
    </div>
  )
}

export default OriginService