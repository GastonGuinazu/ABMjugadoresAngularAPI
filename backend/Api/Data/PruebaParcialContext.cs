using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Api.Data
{
    public partial class PruebaParcialContext : DbContext
    {
        public PruebaParcialContext()
        {
        }

        public PruebaParcialContext(DbContextOptions<PruebaParcialContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Jugadores> Jugadores { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseNpgsql("Host=localhost; Database=PruebaParcial; Username=postgres; Password=gasti123");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Jugadores>(entity =>
            {
                entity.ToTable("jugadores");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Dorsal).HasColumnName("dorsal");

                entity.Property(e => e.Nombre)
                    .HasMaxLength(20)
                    .HasColumnName("nombre");

                entity.Property(e => e.Posicion)
                    .HasMaxLength(20)
                    .HasColumnName("posicion");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
