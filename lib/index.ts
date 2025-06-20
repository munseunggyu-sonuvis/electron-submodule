import { desktopCapturer } from "electron";
import { writeFile } from "fs/promises";
import { homedir } from "os";
import { join as pathJoin } from "path";
import { CaptureScreen } from "@shared/types";

export const captureScreen: CaptureScreen = async (msg: string) => {
  try {
    // 나의 앱 영역만 캡쳐

    const sources = await desktopCapturer.getSources({
      types: ["window"],
      thumbnailSize: { width: 1920, height: 1080 },
    });

    if (sources.length === 0) {
      throw new Error("화면을 찾을 수 없습니다.");
    }

    const source = sources[0];
    const image = source.thumbnail.toPNG();

    // 데스크톱에 스크린샷 저장
    const desktopPath = pathJoin(homedir(), "Desktop");
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const filename = `screenshot-${timestamp}-${msg}.png`;
    const filePath = pathJoin(desktopPath, filename);

    await writeFile(filePath, image);

    return { success: true, filePath, filename };
  } catch (error) {
    console.error("스크린샷 캡처 오류:", error);
    return { success: false, error: error.message };
  }
};
