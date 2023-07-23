resource "aws_dynamodb_table" "table" {
  name           = local.app
  hash_key       = "id"
  read_capacity  = 5
  write_capacity = 5

  attribute {
    name = "id"
    type = "S"
  }

  attribute {
    name = "User#email"
    type = "S"
  }

  global_secondary_index {
    name            = "GSI-User-email"
    hash_key        = "User#email"
    projection_type = "ALL"
    read_capacity   = 5
    write_capacity  = 5
  }
}
