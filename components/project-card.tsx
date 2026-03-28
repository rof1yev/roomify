import { ArrowUpIcon, ClockIcon } from "lucide-react";
import { useNavigate } from "react-router";

const ProjectCard = ({
  id,
  name,
  sourceImage,
  renderedImage,
  timestamp,
}: DesignItem) => {
  const navigate = useNavigate();

  return (
    <div
      className="project-card group"
      onClick={() => navigate(`/visualizer/${id}`)}
    >
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
  );
};

export default ProjectCard;
