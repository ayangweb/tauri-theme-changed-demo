import { getCurrentWebviewWindow } from "@tauri-apps/api/webviewWindow";
import { useMount, useReactive } from "ahooks";
import { Button, ConfigProvider, Space, theme } from "antd";
import { useEffect } from "react";

const appWindow = getCurrentWebviewWindow();
const { defaultAlgorithm, darkAlgorithm } = theme;

interface State {
  theme?: "light" | "dark" | null;
}

const App = () => {
  const state = useReactive<State>({
    theme: "light",
  });

  useMount(() => {
    appWindow.onThemeChanged(({ payload }) => {
      console.log("payload", payload);

      if (state.theme == null) return;

      state.theme = payload;
    });
  });

  useEffect(() => {
    appWindow.setTheme(state.theme);
  }, [state.theme]);

  return (
    <ConfigProvider
      theme={{
        algorithm: state.theme === "dark" ? darkAlgorithm : defaultAlgorithm,
      }}
    >
      <div className="size-screen">
        <Space>
          <Button
            onClick={() => {
              state.theme = "light";
            }}
          >
            Light
          </Button>
          <Button
            onClick={() => {
              state.theme = "dark";
            }}
          >
            Dark
          </Button>
          <Button
            onClick={() => {
              state.theme = void 0;
            }}
          >
            Auto
          </Button>
        </Space>
      </div>
    </ConfigProvider>
  );
};

export default App;
