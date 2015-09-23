echo "Criando instancia do grunt no projeto"
echo "Instalando tasks do grunt na pasta do projeto"

for /f "delims=^>" %%a in (grunt.conf) do npm install %%a

echo "Grunt e tasks instalados com sucesso!"
echo "Baixando Libs necessarias para o projeto"

pause
exit