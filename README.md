

![Blue Futuristic Technology Presentation (32)](https://github.com/user-attachments/assets/fd5f7e1f-a0c9-41b7-92e5-72e4504a5bfe)  


🇧🇷 [Leia em Português](#projeto-pessoal---typescript-react-stock-20) | 🇺🇸 [Read in English](#personal-project---typescript-react-stock-20) | 🎥 [Mídias (fotos e vídeos)](#midias-fotos-e-videos)  

# Projeto Pessoal - Typescript-React-Stock-20  

Este projeto é um site de portfólio pessoal desenvolvido com o objetivo de criar uma página que trás informações de ações negociadas nos EUA e cryptomoedas negociadas globalmente.  

**Características**  

O usuário escolhe entre as páginas "Stock" e "Crypto". Ao selecionar Stock, ele é convidado a digitar o código de qualquer ação negociada nos EUA e receberá uma série de informações sobre esse determinado ativo. Se selecionar a página Crypto, ele irá selecionar ma das criptomoedas elecionadas receberá uma série de informações dela. Projeto feito com react e type-script  

## 📁 Acesso ao projeto  

Não publiquei o projeto por limitações de call das api's e politica de CORS, que dificultam a usabilidade da página.  

## ✔️ Técnicas e tecnologias utilizadas  

- **TypeScript**: Código tipado e mais seguro.  
- **React Hooks**: Utilizei diversos hooks nativos, como `useState`, `useEffect`, `useContext`, `useNavigate`, além de hooks personalizados como `useInputContext` e `useTheme`, para acessar rapidamente os contextos.  
- **React Router**: Paginação feita de forma componentizada, a fim de evitar recarregamento ao mudar as páginas.  
- **Dynamic Router**: Roteamento dinâmico para criar páginas com URLs específicas e adequadas.  
- **React Nested Router**: Implementação de rotas aninhadas, permitindo que componentes filhos sejam renderizados dentro de componentes pais, criando uma navegação estruturada e hierárquica.  
- **Link Ativo**: Utilizei links ativos para melhorar a navegabilidade do projeto.  
- **Context API**: Criei dois contextos:  
  - O primeiro para implementar Light e Dark Mode.  
  - O segundo para capturar e distribuir o input do usuário.  
- **Bootstrap**: Utilizado amplamente no projeto para estilização e layout. Inclui:  
  - Botões estilizados para maior eficiência no design.  
  - Spinner para indicar carregamento de dados da API.  
  - Ícones para complementar o design visual.  
  - Sistema de grid responsivo para organização e melhor adaptação em diferentes dispositivos.  
- **Axios**: Gerenciador de chamadas às APIs para consumir os dados.  
- **Variáveis de Ambiente**: Utilização de variáveis de ambiente para proteger as API keys presentes no projeto.  
- **Proxy**: Configuração de proxy para lidar com restrições de CORS.  

## 🌟 Aprendizados  

- **TypeScript**: Este projeto marcou minha primeira experiência utilizando TypeScript. A adoção da linguagem trouxe um novo nível de segurança e clareza ao código, ajudando a evitar erros comuns e melhorar a manutenção do projeto. Aprendi a definir tipos personalizados, trabalhar com interfaces e usar generics para criar um código mais robusto e previsível.  

- **Axios**: Foi a primeira vez que utilizei a biblioteca Axios para realizar chamadas a APIs. Durante o desenvolvimento, aprendi a configurar instâncias personalizadas, tratar erros de forma eficiente e manipular os dados retornados com mais facilidade, o que contribuiu para uma integração mais fluida com os serviços externos.  

- **Context API**: Este foi meu primeiro contato com a Context API, utilizada para armazenar e compartilhar informações globalmente dentro da aplicação. Aprendi a criar e consumir contextos, aplicando-os para implementar funcionalidades como Light/Dark Mode e gerenciamento de inputs do usuário, o que eliminou a necessidade de passar props manualmente entre componentes.  

## 🚀 Próximos Desafios  

- **CORS**: Durante o desenvolvimento, enfrentei dificuldades para lidar com a política de CORS em ambiente de produção. Embora tenha configurado um proxy para testes locais, a solução não é ideal para produção. Meu próximo objetivo é explorar o uso de bibliotecas como `cors-anywhere` ou configurar middlewares no frontend para gerenciar esse problema de forma eficiente e segura.  

- **Cacheamento de API**: Notei que as chamadas às APIs não estão sendo otimizadas, resultando em renderizações constantes e consumo desnecessário de chamadas. Um dos meus desafios futuros é implementar uma estratégia eficiente de cacheamento, como o uso de `localStorage`, `sessionStorage` ou bibliotecas como React Query, para armazenar os dados retornados e reduzir a quantidade de requisições, melhorando a performance e a experiência do usuário.  

Neste repositório, você tem acesso a todo o material produzido no projeto.  

# Personal Project - Typescript-React-Stock-20  

This project is a personal portfolio website developed to create a page that provides information about stocks traded in the US and cryptocurrencies traded globally.  

**Features**  

The user can choose between the "Stock" and "Crypto" pages. When selecting Stock, they are prompted to enter the code of any stock traded in the US and will receive a series of information about the selected asset. If they select the Crypto page, they can choose one of the available cryptocurrencies and will receive detailed information about it. The project was built using React and TypeScript.  

## 📁 Project Access  

I have not published the project due to limitations in API calls and CORS policy, which make the page usability challenging.  

## ✔️ Tools and Technologies Used  

- **TypeScript**: Typed and more secure code.  
- **React Hooks**: Leveraged several native hooks, such as `useState`, `useEffect`, `useContext`, `useNavigate`, as well as custom hooks like `useInputContext` and `useTheme`, to quickly access contexts.  
- **React Router**: Componentized pagination to prevent reloading when switching pages.  
- **Dynamic Router**: Dynamic routing to create pages with specific and appropriate URLs.  
- **React Nested Router**: Implementation of nested routes, allowing child components to render within parent components, creating a structured and hierarchical navigation.  
- **Active Links**: Used active links to improve project navigability.  
- **Context API**: Created two contexts:  
  - The first for implementing Light and Dark Mode.  
  - The second for capturing and distributing user input.  
- **Bootstrap**: Extensively used in the project for styling and layout, including:  
  - Styled buttons for better design efficiency.  
  - Spinner to indicate API data loading.  
  - Icons to complement the visual design.  
  - Responsive grid system for better organization and adaptation to different devices.  
- **Axios**: Used to manage API calls and consume data.  
- **Environment Variables**: Utilized environment variables to protect the API keys in the project.  
- **Proxy**: Configured a proxy to handle CORS restrictions.  

## 🌟 Learnings  

- **TypeScript**: This project marked my first experience using TypeScript. Adopting the language brought a new level of safety and clarity to the code, helping to avoid common errors and improve project maintainability. I learned to define custom types, work with interfaces, and use generics to create more robust and predictable code.  

- **Axios**: It was my first time using the Axios library to make API calls. During the development, I learned how to configure custom instances, handle errors efficiently, and manipulate the returned data more easily, resulting in a smoother integration with external services.  

- **Context API**: This was my first experience with the Context API, used to store and share information globally within the application. I learned how to create and consume contexts, applying them to implement features like Light/Dark Mode and managing user inputs, eliminating the need to pass props manually between components.  

## 🚀 Next Challenges  

- **CORS**: During development, I faced challenges in dealing with the CORS policy in a production environment. While I configured a proxy for local testing, the solution is not ideal for production. My next goal is to explore solutions like `cors-anywhere` or use middleware on the frontend to efficiently and securely address this issue.  

- **API Caching**: I noticed that API calls are not optimized, resulting in constant rendering and unnecessary API calls. A future challenge is to implement an efficient caching strategy, such as using `localStorage`, `sessionStorage`, or libraries like React Query, to store the returned data and reduce the number of requests, enhancing performance and user experience.  

## 🎥 Mídias (fotos e vídeos)  

![image](https://github.com/user-attachments/assets/83db5455-e0e4-458d-9132-ee5f3aa70b5b)  
![image](https://github.com/user-attachments/assets/862bc695-bded-4554-9987-a355ee4708bf)  
![image](https://github.com/user-attachments/assets/9757b850-67e0-4f2a-8cca-69a820bb92ac)  
![image](https://github.com/user-attachments/assets/3e607853-47fa-4f2d-a1f0-a6b0996fec04)  
![image](https://github.com/user-attachments/assets/a7de625e-803e-4bd2-b3fd-15ca24b278b1)  
![image](https://github.com/user-attachments/assets/164f1bdb-04a7-4691-8b1f-66de50f71670)  
![image](https://github.com/user-attachments/assets/07cae4a0-12cd-40b3-8fec-d86d569644a2)  
![image](https://github.com/user-attachments/assets/462c4a36-5a22-4f6b-85a7-1eabd209d222)  
![image](https://github.com/user-attachments/assets/018bfa33-ca91-42da-91a9-bc526e2b2844)  
![image](https://github.com/user-attachments/assets/e462ecae-7c90-4f5b-9120-df8b01148c00)  
![image](https://github.com/user-attachments/assets/3626dba2-c7f2-4c83-8654-699bf316b27b)  
