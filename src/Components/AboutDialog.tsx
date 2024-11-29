import { BsGithub } from "react-icons/bs";
import { RiGitRepositoryLine } from "react-icons/ri";
import Dialog from "./Dialog";
import DialogTypes from "./enums/dialogTypes";
import Logo from "./Logo";

type AboutDialogProps = {
  open: boolean;
  onAccept: () => void;
};

function AboutDialog({ open, onAccept }: AboutDialogProps) {
  return (
    <>
      <Dialog type={DialogTypes.INFO} open={open} onAccept={onAccept}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Logo />
          <p>Yes, another to do list app to try React for the first time.</p>
          <div>
            <RiGitRepositoryLine />
            <a
              style={{ marginLeft: 8 }}
              href="https://github.com/Lurky-phish-2085/just-do-it-list"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github Repository
            </a>
          </div>
          <div>
            <BsGithub />
            <a
              style={{ marginLeft: 8 }}
              href="https://github.com/Lurky-phish-2085"
              target="_blank"
              rel="noopener noreferrer"
            >
              Check out my Github profile!
            </a>
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default AboutDialog;
