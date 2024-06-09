import Search from '../components/Search';
function Header({setQuery}) {
  return (
    <div className="header">
        <div>logo</div>
        <Search setQuery={setQuery}/>
    </div>
  );
}

export default Header;
