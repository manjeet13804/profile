import "./logout.css"
const Logout = () => {
  const logoutHandle = ()=>{
    localStorage.clear();
  }
  return (
    <button className="logout" onClick={logoutHandle}>Logout</button>
  );
  
};
export default Logout;
