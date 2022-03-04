//백엔드 URL을 가져올 수 있도록 처리

let backendHost;

const hostname = window && window.location && window.location.hostname;

if(hostname === "localhost"){
    backendHost = "http://localhost:8088";
}

export const API_BASE_URL = `${backendHost}`;