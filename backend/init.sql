USE [master]
GO

IF DB_ID('todos') IS NOT NULL
  set noexec on

CREATE DATABASE [todos];
GO

USE [todos]
GO