USE taller;

DROP FUNCTION IF EXISTS modificarToken;
DROP PROCEDURE IF EXISTS verificarTokenR;

DELIMITER $$
CREATE FUNCTION modificarToken (_idUsuario VARCHAR(100), _tkR varchar(255)) RETURNS INT(1) 
READS SQL DATA DETERMINISTIC
begin
    declare _cant int;
    select count(idUsuario) into _cant from usuario where idUsuario = _idUsuario OR correo = _idUsuario;
    if _cant > 0 then
        update usuario set
                tkR = _tkR
                where idUsuario = _idUsuario OR correo = _idUsuario;
        if _tkR <> "" then
            update usuario set
                ultimoAcceso = now()
                where idUsuario = _idUsuario OR correo = _idUsuario;
        end if;
    end if;
    return _cant;
end$$

CREATE PROCEDURE verificarTokenR (_idUsuario VARCHAR(100), _tkR varchar(255)) 
begin
    select rol from usuario where idUsuario = _idUsuario OR correo = _idUsuario and tkR = _tkR;
end$$



DELIMITER ;










