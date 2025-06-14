# Backend
book 디렉터리를 다운받습니다.
intelij로 해당 디렉터리를 오픈합니다.
src -> main -> resources의 application-example.properties를 application.properties로 rename합니다.
spring.datasource.password= 부분에 db의 password를 입력합니다.

# DB
story.sql을 다운 받습니다.
mysql workbench를 실행합니다.
CREATE DATABASE story;를 입력하여 데이터베이스를 생성합니다.
server -> data import를 클릭합니다.
import from self-contained file을 클릭하고 story.sql파일을 선탁합니다.
default target schema를 story로 지정합니다.
하단의 start import를 클릭합니다.
