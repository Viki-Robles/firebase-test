import SignUp from './Signup/Signup';
import { AuthProvider } from './Contents/Auth';

function App() {
  return (
    <AuthProvider>
    <div className="App">
      <SignUp/>
    </div>
    </AuthProvider>
  );
}

export default App;
