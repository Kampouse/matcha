import {useNavigate} from 'solid-start'
export  default function Settings() {
  const nav = useNavigate()
  nav("/app/home")
  return (
    <div>
      <h1>home page </h1>
    </div>
  );
}
