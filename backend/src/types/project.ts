export default interface ProjectState {
  id: string;
  title: string;
  description: string;
  github_link?: string;
  previewImage?: string;
  live_link?: string;
  tools?: string[];
}
