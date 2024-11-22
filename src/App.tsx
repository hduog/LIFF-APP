import { useEffect, useState } from "react";
import liff from "@line/liff";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [token, setToken] = useState("chưa có gì đâu");
  const [idToken, setIdToken] = useState<any>("chưa có gì đâu 2");
  const [profile, setProfile] = useState<any>();

  useEffect(() => {
    liff
      .init({
        liffId: import.meta.env.VITE_LIFF_ID,
        withLoginOnExternalBrowser: true,
      })
      .then(() => {
        setMessage("LIFF init succeeded.");
        const idToken = liff.getIDToken();
        const token = liff.getAccessToken();
        const profile = liff.getDecodedIDToken()?.email;

        setProfile(profile);
        setToken(token ?? "");
        setIdToken(idToken ?? "");
      })
      .catch((e: Error) => {
        setMessage("LIFF init failed.");
        setError(`${e}`);
      });
  }, []);

  const copyToClipboard = (text: any) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="App">
      <h1>create-liff-app</h1>
      <h1>Token: {token}</h1>
      <button onClick={() => copyToClipboard(token)}>Copy Token</button>
      <h1>ID Token: {idToken}</h1>
      <button onClick={() => copyToClipboard(idToken)}>Copy ID Token</button>
      <h1>profile: {profile ?? "không get đc "}</h1>
      <button onClick={() => copyToClipboard(idToken)}>Copy ID Token</button>
      {message && <p>{message}</p>}
      {error && (
        <p>
          <code>{error}</code>
        </p>
      )}
      <a
        href="https://developers.line.biz/ja/docs/liff/"
        target="_blank"
        rel="noreferrer"
      >
        LIFF Documentation
      </a>
    </div>
  );
}

export default App;
