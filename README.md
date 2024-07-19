# Basal Diet - App de Criação e Consulta de Dietas

O Basal Diet é um aplicativo desenvolvido em Angular que simplifica a criação e consulta de dietas personalizadas. Ele segue um fluxo intuitivo, calculando o gasto basal do usuário antes de permitir a criação detalhada de refeições.

Para acessar o app, clique no link a seguir: [Basal Diet App](https://basal-diet-production.up.railway.app/)

## Funcionalidades Principais

- **Cálculo do Gasto Basal:**
  - Determine o gasto basal do usuário como ponto de partida.

- **Criação de Refeições:**
  - Defina refeições personalizadas, como café da manhã, almoço, e jantar.

- **Adição de Alimentos:**
  - Para cada refeição, adicione alimentos especificando seu peso e macronutrientes.

- **Cálculos Automáticos:**
  - O aplicativo calcula automaticamente as calorias totais e macronutrientes de cada refeição.

- **Controle da Dieta:**
  - Acompanhe o consumo diário de calorias, proporcionando controle total sobre a dieta.


### Instalação

1. **Angular CLI:**
   - Certifique-se de ter o Angular CLI versão 15.2.10 instalado. Caso não tenha, você pode instalá-lo executando o seguinte comando:
     ```bash
     npm i @angular/cli@15.2.10
     ```

2. **Dependências do Projeto:**
   - Na primeira vez que iniciar o projeto, execute o seguinte comando para instalar as dependências:
     ```bash
     npm i
     ```

3. **Iniciar o Servidor Local:**
   - Para iniciar o servidor local, utilize o comando:
     ```bash
     ng serve
     ```
   - O servidor será iniciado por padrão em `http://localhost:4200`.
   - A aplicação reiniciará automaticamente sempre que houver uma mudança no código do projeto.
  
### Backend do Projeto

O backend foi desenvolvido utilizando o Django Rest Framework e os dados são armazenados no MySQL.
Link repositório [Basal Diet API](https://github.com/bragaronaldo/basal-diet-api)

## Criação de Dietas
### Formulário Inicial

Preencha um formulário simples com seu nome, peso, altura e idade para realizar o cálculo basal. Após o preenchimento, o resultado do cálculo será apresentado juntamente com um botão "Criar Dieta".

### Página de Dieta

Ao clicar em "Dieta", você será direcionado para uma nova página que exibirá as calorias totais somando todas as refeições.

![basal](https://github.com/user-attachments/assets/e70efa9b-bf19-4732-b1bd-bf6d1d1658e4)

### Gestão de Refeições

Inicie a criação da sua dieta clicando no botão "Nova Refeição". Dentro da tabela de refeição, você pode adicionar, editar e excluir alimentos.

![addmeal](https://github.com/user-attachments/assets/04db2d1c-a52c-404a-ae6c-c5d38d0dbb21)

### Informações Detalhadas

Cada tabela de refeição exibe o total de macronutrientes e calorias específicos para aquela refeição em particular.

### Personalização Completa

Adicione quantas tabelas de refeição forem necessárias. Além disso, você pode editar e excluir o nome das tabelas de refeição para uma experiência personalizada.

![addfood](https://github.com/user-attachments/assets/f4731564-a064-4d20-8b68-3fb99642b67c)

No header do aplicativo, é exibido o total somado de calorias, proteínas, carboidratos e gorduras de todas as refeições. Ao deslizar para o lado, é apresentada a quantidade em gramas por quilo.. Por exemplo, a recomendação diária de consumo de proteína é de 1,6 g/kg a 2 g/kg.

![total](https://github.com/user-attachments/assets/c5dbb7b6-3041-429e-940d-58c1e079a72b)

Este fluxo de criação de dietas proporciona uma jornada intuitiva, desde o preenchimento do formulário até a gestão detalhada das refeições, garantindo controle total sobre as calorias e macronutrientes consumidos.

## Contato

Se você tiver alguma dúvida, sugestão ou relatório de problema, sinta-se à vontade de entrar em contato através do e-mail [ronaldo.tbj@gmail.com].


[![Versão do Angular](https://img.shields.io/badge/angular-15.2.10-red)](https://angular.io/)
[![DeepScan grade](https://deepscan.io/api/teams/23174/projects/26443/branches/842339/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=23174&pid=26443&bid=842339)
[![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)](https://shields.io/)
