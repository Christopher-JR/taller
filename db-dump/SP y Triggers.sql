use taller;
DELIMITER $$
DROP PROCEDURE IF EXISTS eliminarCliente$$
CREATE PROCEDURE eliminarCliente (_id INT(1))
begin
    declare _cant int;
    declare _resp int;
    set _resp = 0;
    select count(id) into _cant from cliente where id = _id;
    if _cant > 0 then
        set _resp = 1;
        select count(id) into _cant from artefacto where idCliente = _id;
        if _cant = 0 then
            delete from cliente where id = _id;
        else 
            -- select 2 into _resp;
            set _resp = 2;
        end if;
    end if;
    select _resp as resp;
end$$

DELIMITER ;





use taller;

DELIMITER $$
CREATE TRIGGER eliminar_cliente AFTER DELETE ON cliente FOR EACH ROW
BEGIN

 DELETE FROM usuario WHERE usuario.idUsuario = OLD.id;

END$$
DELIMITER ;








