import { UnityContent } from "react-unity-webgl"

const unityContent  = new UnityContent(
    `${process.env.PUBLIC_URL}/unity/Build/${process.env.REACT_APP_UNITY_JSON}`,
    `${process.env.PUBLIC_URL}/unity/Build/${process.env.REACT_APP_UNITY_LOADER}`
)

export default unityContent