import Navbar from "components/navbar";
import type { Route } from "./+types/home";
import {
  ArrowRightIcon,
  ArrowUpIcon,
  ClockIcon,
  LayersIcon,
  PlayIcon,
} from "lucide-react";
import Button from "components/ui/button";
import Upload from "components/upload";
import { useNavigate } from "react-router";
import { useState } from "react";
import { createProject } from "lib/puter.actions";

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

export default function Home() {
  const navigate = useNavigate();

  const [projects, setProjects] = useState<DesignItem[]>([]);

  const handleUploadComplete = async (base64Image: string) => {
    const newId = Date.now().toString();
    const name = `Residence ${newId}`;

    const newItem = {
      id: newId,
      name,
      sourceImage: base64Image,
      renderedImage: undefined,
      timestamp: Date.now(),
    };

    const saved = await createProject({ item: newItem, visibility: "private" });

    if (!saved) {
      console.error(`Failed to create project`);
      return false;
    }

    setProjects((prev) => [...prev, saved]);

    navigate(`/visualizer/${newId}`, {
      state: {
        initialImage: saved.sourceImage,
        initialRendered: saved.renderedImage || null,
        name,
      },
    });
    return true;
  };

  return (
    <div className="home">
      <Navbar />

      <section className="hero">
        <div className="announce">
          <div className="dot">
            <div className="pulse" />
          </div>
          <p>Introducing Roomify 2.0</p>
        </div>

        <h1>Build beautiful spaces at the speed of thought with Roomify</h1>
        <p className="subtitle">
          Roomify is an AI-first design environment that helps you visualize,
          render and ship architectural projects faster than ever.
        </p>

        <div className="actions">
          <a href="#upload" className="cta">
            Start Building <ArrowRightIcon className="icon" />
          </a>

          <Button variant="outline" size="lg" className="demo">
            Watch Demo <PlayIcon className="icon" />
          </Button>
        </div>

        <div id="upload" className="upload-shell">
          <div className="grid-overlay" />

          <div className="upload-card">
            <div className="upload-head">
              <div className="upload-icon">
                <LayersIcon className="icon" />
              </div>
              <h3>Upload your floor plan</h3>
              <p>Supports JPG, PNG, formats up to 10MB</p>
            </div>
            <Upload onComplete={handleUploadComplete} />
          </div>
        </div>
      </section>

      <section className="projects">
        <div className="section-inner">
          <div className="section-head">
            <div className="copy">
              <h2>Projects</h2>
              <p>
                Your latest work and shared community projects, all in one
                place.
              </p>
            </div>
          </div>

          <div className="projects-grid">
            {projects.map(
              ({
                id,
                name,
                renderedImage,
                sourceImage,
                timestamp,
              }: DesignItem) => (
                <div key={id} className="project-card group">
                  <div className="preview">
                    <img src={renderedImage || sourceImage} alt="Project" />

                    <div className="badge">
                      <span>Community</span>
                    </div>
                  </div>

                  <div className="card-body">
                    <div>
                      <h3>{name}</h3>

                      <div className="meta">
                        <ClockIcon size={12} />
                        <span>{new Date(timestamp).toLocaleDateString()}</span>
                        <span>By rof1yev</span>
                      </div>
                    </div>

                    <div className="arrow">
                      <ArrowUpIcon size={18} />
                    </div>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
