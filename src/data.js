// Personalize os campos marcados como temporários antes de publicar o portfólio.
export const portfolioData = {
  name: "Letícia Duarte Vilela", 
  resume: "./assets/curriculo.pdf", 
  contact: {
    email: "leticiaduartevilela@gmail.com", 
    linkedin: "https://linkedin.com/in/leticiaduarte6", 
    github: "https://github.com/leticia-darte", 
  },
  skills: [
    {
      category: "Desenvolvimento Front-end",
      items: [
        { name: "HTML5", mark: "5", tone: "orange" },
        { name: "CSS3", mark: "3", tone: "blue" },
        { name: "JavaScript", mark: "JS", tone: "yellow" },
      ],
    },
    {
      category: "Desenvolvimento Back-end",
      items: [
        { name: "PHP", mark: "php", tone: "purple" },
        { name: "Lógica de programação", mark: "{ }", tone: "green" },
      ],
    },
    {
      category: "Ferramentas e tecnologias",
      items: [
        { name: "Git", mark: "⌘", tone: "orange" },
        { name: "GitHub", mark: "◉", tone: "white" },
        { name: "Visual Studio Code", mark: "‹›", tone: "blue" },
      ],
    },
  ],
  // Preencha com projetos reais. Cada item pode ter: title, description, technologies, demoUrl, repoUrl e image.
  projects: [],
  education: [
    {
      course: "Desenvolvimento de Software Multiplataforma",
      institution: "FATEC",
      status: "Em andamento",
      type: "Graduação tecnológica",
    },
    {
      course: "Técnico em Informática",
      institution: "",
      status: "Concluído",
      type: "Formação técnica",
    },
  ],
};
