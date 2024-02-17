# Basal Diet - App de Criação e Consulta de Dietas

O Basal Diet é um aplicativo desenvolvido em Angular que simplifica a criação e consulta de dietas personalizadas. Ele segue um fluxo intuitivo, calculando o gasto basal do usuário antes de permitir a criação detalhada de refeições.

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
  
### Utilizando o JSON Server

Atualmente, as requisições estão sendo processadas utilizando o JSON Server, uma ferramenta que permite simular uma API RESTful de forma simples e eficiente. Para instalar use o comando:

```bash
npm install json-server
```

Para iniciar o JSON Server localmente, utilize o seguinte comando na pasta do projeto:

```bash
json-server --watch db.json
```

## Migração para Django em Progresso

Está em andamento o processo de migração para o Django, uma estrutura robusta e flexível para desenvolvimento web em Python.


## Criação de Dietas
### Formulário Inicial

Preencha um formulário simples com seu nome, peso, altura e idade para realizar o cálculo basal. Após o preenchimento, o resultado do cálculo será apresentado juntamente com um botão "Criar Dieta".

### Página de Dieta

Ao clicar em "Criar Dieta", você será direcionado para uma nova página que exibirá as calorias totais somando todas as refeições.

![ezgif-3-9e001f44d9](https://github.com/bragaronaldo/basal-diet/assets/88466880/d10396ab-bdf8-4d71-adcc-77c5864c236c)

### Gestão de Refeições

Inicie a criação da sua dieta clicando no botão "Nova Refeição". Dentro da tabela de refeição, você pode adicionar, editar e excluir alimentos.

![ezgif-3-e458e5d4c3](https://github.com/bragaronaldo/basal-diet/assets/88466880/a89dd413-fdf8-467b-9770-a59cc8d4fe66)

### Informações Detalhadas

Cada tabela de refeição exibe o total de macronutrientes e calorias específicos para aquela refeição em particular.

### Personalização Completa

Adicione quantas tabelas de refeição forem necessárias. Além disso, você pode editar e excluir o nome das tabelas de refeição para uma experiência personalizada.

![ezgif-3-ac1ff80f7d](https://github.com/bragaronaldo/basal-diet/assets/88466880/a8b1c5d3-4f45-4482-9c85-17553bc70fb6)

Este fluxo de criação de dietas proporciona uma jornada intuitiva, desde o preenchimento do formulário até a gestão detalhada das refeições, garantindo controle total sobre as calorias e macronutrientes consumidos.

## Contato

Se você tiver alguma dúvida, sugestão ou relatório de problema, sinta-se à vontade de entrar em contato através do e-mail [ronaldo.tbj@gmail.com].


[![Versão do Angular](https://img.shields.io/badge/angular-15.2.10-red)](https://angular.io/)
[![DeepScan grade](https://deepscan.io/api/teams/23174/projects/26443/branches/842339/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=23174&pid=26443&bid=842339)
[![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)](https://shields.io/)
