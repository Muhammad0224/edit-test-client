import {Route, Switch} from "react-router-dom";
import Home from "./Home";
import Edit from "./Edit";

function App() {

    return (
   <Switch>
     <Route path={'/'} component={Home} exact={true}/>
     <Route path={'/edit'} component={Edit} exact={true} />
   </Switch>
  );
}

export default App;
