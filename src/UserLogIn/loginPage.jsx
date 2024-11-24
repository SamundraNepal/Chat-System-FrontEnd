import UInput from "../ReUseComponenets/Input";

export default function LoginUser() {
  return (
    <div>
      <p>Login Page</p>
      <div>
        <form>
          <UInput PlaceHolder={"Enter Email Address"} Type={"Text"} />
          <UInput PlaceHolder={"Enter Password"} Type={"password"} />
        </form>
      </div>
    </div>
  );
}
