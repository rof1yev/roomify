import { generate3DView } from "lib/ai.actions";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import type { Route } from "../+types/root";
import {
  BoxIcon,
  DownloadIcon,
  RefreshCcwIcon,
  Share2Icon,
  XIcon,
} from "lucide-react";
import Button from "components/ui/button";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Roomify" },
    {
      name: "description",
      content:
        "AI-powered architectural visualization platform built with React and Puter; featuring 2D-to-3D photorealistic rendering, serverless workers, high-performance KV storage, and a global community feed.",
    },
  ];
}

const VisualizerId = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { initialImage, initialRendered, name } = location.state || {};

  const hasInitialGenerated = useRef(false);

  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [currentImage, setCurrentImage] = useState<string | null>(
    initialRendered || null,
  );

  const handleBack = () => navigate("/");

  const runGeneration = async () => {
    if (!initialImage) return;
    setIsProcessing(true);

    try {
      const result = await generate3DView({ sourceImage: initialImage });
      console.log(result);

      if (result.renderedImage) {
        setCurrentImage(result.renderedImage);

        // update the project with the rendered image.
      }
    } catch (e) {
      console.error("Failed generation image", e);
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    if (!initialImage || hasInitialGenerated.current) return;

    if (initialRendered) {
      setCurrentImage(initialRendered);
      hasInitialGenerated.current = true;
      return;
    }

    hasInitialGenerated.current = true;
    runGeneration();
  }, [initialImage, initialRendered]);

  return (
    <div className="visualizer">
      <nav className="topbar">
        <a href="/" className="brand">
          <BoxIcon className="logo" />
          <span className="name">Roomify</span>
        </a>
        <Button variant="ghost" size="sm" onClick={handleBack} className="exit">
          <XIcon className="icon" /> Exit editor
        </Button>
      </nav>

      <section className="content">
        <div className="panel">
          <div className="panel-header">
            <div className="panel-meta">
              <p>Project</p>
              <h2>{"Untitled Project"}</h2>
              <p className="note">Created by You</p>
            </div>

            <div className="panel-actions">
              <Button
                size="sm"
                onClick={() => {}}
                className="export"
                disabled={!currentImage}
              >
                <DownloadIcon className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button
                size="sm"
                onClick={() => {}}
                className="share"
                disabled={!currentImage}
              >
                <Share2Icon className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>

          <div className={`render-area ${isProcessing ? "is-processing" : ""}`}>
            {currentImage ? (
              <img src={currentImage} alt="AI Render" className="render-img" />
            ) : (
              <div className="render-placeholder">
                {initialImage && (
                  <img
                    src={initialImage}
                    alt="Initial Image"
                    className="render-fallback"
                  />
                )}
              </div>
            )}

            {isProcessing && (
              <div className="render-overlay">
                <div className="rendering-card">
                  <RefreshCcwIcon className="spinner" />
                  <span className="title">Rendering ...</span>
                  <span className="subtitle">
                    Generating your 3D visualization
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default VisualizerId;
