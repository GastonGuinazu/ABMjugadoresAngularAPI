
using Api.Data;
using Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("[controller]")]
public class JugadorController : ControllerBase
{
    private readonly PruebaParcialContext _context;
    public JugadorController(PruebaParcialContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<List<JugadorModel>>> Get()
    {
        var jugador = await _context.Jugadores.Select(x => new JugadorModel
        {
            Id= x.Id,
            Nombre = x.Nombre,
            Posicion= x.Posicion,
            Dorsal= x.Dorsal
        }).ToListAsync();
        return Ok(jugador);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<JugadorModel>> Get(int id)
    {
        var jugador = await _context.Jugadores.FindAsync(id);
        if (jugador == null)
        {
            return NotFound($"No se encontró el Jugador con el id {id}");
        }
        var jugadorModel = new Jugadores
        {
            Id = jugador.Id,
            Nombre = jugador.Nombre,
            Posicion = jugador.Posicion,
            Dorsal = jugador.Dorsal,
           };
        return Ok(jugadorModel);
    }


    [HttpPost]
    public async Task<ActionResult<JugadorModel>> Create(JugadorCreateModel user)
    {
        var newJugador = new Jugadores
        {
            Nombre = user.Nombre,
            Posicion = user.Posicion,
            Dorsal = user.Dorsal,
        
        };
        _context.Jugadores.Add(newJugador);
        await _context.SaveChangesAsync();

        var jugadorModel = new JugadorModel
        {
            Id = newJugador.Id,
            Nombre = newJugador.Nombre,
            Posicion = newJugador.Posicion,
            Dorsal = newJugador.Dorsal,
        
        };
        return Ok(jugadorModel);
    }


     [HttpPut("{id}")]
    public async Task<ActionResult<JugadorModel>> Update(int id, JugadorCreateModel request)
    {
        var jugador = await _context.Jugadores.FindAsync(id);
        if (jugador == null)
        {
            return NotFound($"No se encontró el jugador con el id {id}");
        }

        jugador.Nombre = request.Nombre;
        jugador.Posicion = request.Posicion;
        jugador.Dorsal = request.Dorsal;      
      
        _context.Update(jugador);
        await _context.SaveChangesAsync();

        var jugadorModel = new JugadorModel
        {
            Id = jugador.Id,
            Nombre = jugador.Nombre,
            Posicion = jugador.Posicion,
            Dorsal = jugador.Dorsal,
          
        };
        return Ok(jugadorModel);
    }


    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(int id)
    {
        var jugador = await _context.Jugadores.FindAsync(id);
        if (jugador == null)
        {
            return NotFound($"No se encontró el Jugador con el id {id}");
        }

        _context.Jugadores.Remove(jugador);
        await _context.SaveChangesAsync();

        return Ok();
    }

    
}