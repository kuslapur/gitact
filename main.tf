provider "aws" {
  region = var.region
}

resource "aws_instance" "my_ec2" {
  ami           = var.ami
  instance_type = var.instance_type

  key_name      = var.key_name
  subnet_id     = var.subnet_id
  vpc_security_group_ids = [var.security_group]

  tags = {
    Name = "GitHub-Terraform-EC2"
  }
}
