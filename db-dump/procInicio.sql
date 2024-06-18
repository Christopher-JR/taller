USE taller;
DELIMITER $$
DROP PROCEDURE IF EXISTS IniciarSesion$$
CREATE PROCEDURE IniciarSesion(_id int, _passw varchar(255))
BEGIN
    select idUsuario, rol from usuario where id = _id and passw = _passw;
END$$

DELIMITER ;

-- call IniciarSesion(2,"$2y$10$yrO1EpA1tTUB6NnPbBY6M.1xSW1cRK.Ikk2mWia3CJRVZHwKa8/vW");